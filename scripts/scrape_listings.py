#!/usr/bin/env python3
"""
Scrapes live listings, photos, details, amenities, and coordinates from:
https://spokanearearentals.appfolio.com/listings
and outputs to mpm_site/data/available_listings.json
"""

import urllib.request
import re
import json
import html
import sys
import os
from datetime import datetime

def scrape():
    main_url = "https://spokanearearentals.appfolio.com/listings"
    print(f"Fetching listings from {main_url}...")
    
    req = urllib.request.Request(
        main_url,
        headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
    )
    with urllib.request.urlopen(req) as resp:
        main_html = resp.read().decode("utf-8", errors="ignore")

    # 1. Parse markers for coordinates and base metadata
    markers_by_id = {}
    start = main_html.find("markers: [")
    if start != -1:
        end = main_html.find("],", start)
        if end != -1:
            try:
                markers_raw = json.loads(main_html[start + len("markers: "):end + 1])
                for m in markers_raw:
                    markers_by_id[m["listing_id"]] = m
            except Exception as e:
                print("Warning parsing markers:", e)

    # 2. Parse listing cards from HTML
    parts = re.split(r'<div class=\"listing-item result js-listing-item\" id=\"listing_(\d+)\">', main_html)
    
    listings = []
    total = len(parts) // 2
    print(f"Found {total} listings. Parsing card details...")

    for i in range(1, len(parts), 2):
        lid = int(parts[i])
        block = parts[i + 1]

        t_match = re.search(r'class=\"listing-item__title[^\"]*\"[^>]*>\s*<a[^>]*>(.*?)</a>', block, re.DOTALL)
        title = html.unescape(t_match.group(1).strip()) if t_match else ""

        a_match = re.search(r'class=\"[^\"]*js-listing-address[^\"]*\"[^>]*>(.*?)</span>', block, re.DOTALL)
        address = html.unescape(a_match.group(1).strip()) if a_match else ""

        # Extract City
        city = "Spokane"
        if "Spokane Valley" in address:
            city = "Spokane Valley"
        elif "Cheney" in address:
            city = "Cheney"
        elif "Liberty Lake" in address:
            city = "Liberty Lake"
        elif "Mead" in address:
            city = "Mead"
        elif "Colbert" in address:
            city = "Colbert"

        r_match = re.search(r'<dt class=\"detail-box__label\">RENT</dt>\s*<dd class=\"detail-box__value\">([^<]+)</dd>', block)
        rent = r_match.group(1).strip() if r_match else ""
        rent_num = int(re.sub(r'[^\d]', '', rent)) if re.sub(r'[^\d]', '', rent) else 0

        sq_match = re.search(r'<dt class=\"detail-box__label\">Square Feet</dt>\s*<dd class=\"detail-box__value\">([^<]+)</dd>', block)
        sqft = sq_match.group(1).strip() if sq_match else ""
        sqft_num = int(re.sub(r'[^\d]', '', sqft)) if re.sub(r'[^\d]', '', sqft) else 0

        bb_match = re.search(r'<dt class=\"detail-box__label\">Bed / Bath</dt>\s*<dd class=\"detail-box__value\">([^<]+)</dd>', block)
        bed_bath = bb_match.group(1).strip() if bb_match else ""

        beds = 0
        baths = 1.0
        if "Studio" in bed_bath:
            beds = 0
        else:
            bm = re.search(r'(\d+)\s*bd', bed_bath)
            if bm:
                beds = int(bm.group(1))
        bam = re.search(r'([\d\.]+)\s*ba', bed_bath)
        if bam:
            baths = float(bam.group(1))

        av_match = re.search(r'<dt class=\"detail-box__label\">Available</dt>\s*<dd class=\"detail-box__value js-listing-available\">([^<]+)</dd>', block)
        available = av_match.group(1).strip() if av_match else ""

        img_match = re.search(r'data-original=\"([^\"]+)\"', block)
        image = img_match.group(1).replace("medium.jpg", "large.jpg") if img_match else ""

        u_match = re.search(r'href=\"(/listings/detail/[^\"]+)\"', block)
        detail_url = ("https://spokanearearentals.appfolio.com" + u_match.group(1)) if u_match else ""

        marker = markers_by_id.get(lid, {})
        lat = marker.get("latitude")
        lng = marker.get("longitude")

        item = {
            "id": lid,
            "title": title,
            "address": address,
            "city": city,
            "rent": rent,
            "rent_numeric": rent_num,
            "sqft": sqft,
            "sqft_numeric": sqft_num,
            "bed_bath": bed_bath,
            "beds": beds,
            "baths": baths,
            "available": available,
            "image": image,
            "photos": [image] if image else [],
            "latitude": lat,
            "longitude": lng,
            "detail_url": detail_url,
            "description": "",
            "amenities": [],
            "cats_allowed": False,
            "dogs_allowed": False,
        }
        listings.append(item)

    # 3. Enrich each listing from its detail page
    print(f"Scraping detail pages for all {len(listings)} listings...")
    for idx, item in enumerate(listings):
        if not item["detail_url"]:
            continue
        try:
            req_d = urllib.request.Request(item["detail_url"], headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req_d, timeout=10) as r_d:
                dhtml = r_d.read().decode("utf-8", errors="ignore")

            # Photos
            pmatches = re.findall(r'data-original=\"(https://images\.cdn\.appfolio\.com/[^\"]+)\"', dhtml)
            if not pmatches:
                pmatches = re.findall(r'href=\"(https://images\.cdn\.appfolio\.com/[^\"]+)\"', dhtml)
            photos = list(dict.fromkeys([p.replace("medium.jpg", "large.jpg") for p in pmatches]))
            if photos:
                item["photos"] = photos
            elif item["image"] and not item["photos"]:
                item["photos"] = [item["image"]]

            # Description
            desc_m = re.search(r'<meta property=\"og:description\" content=\"(.*?)\"', dhtml, re.DOTALL)
            if desc_m:
                item["description"] = html.unescape(desc_m.group(1).strip())

            # Amenities & Pet policies
            raw_amenities = re.findall(r'<li[^>]*>([^<]+)</li>', dhtml)
            filtered_amenities = []
            for a in raw_amenities:
                a_clean = a.strip()
                if not a_clean or len(a_clean) > 60:
                    continue
                if any(x in a_clean for x in ["Rent:", "Application Fee:", "Security Deposit:", "Available "]):
                    continue
                if a_clean.lower() == "cats allowed":
                    item["cats_allowed"] = True
                elif a_clean.lower() == "dogs allowed":
                    item["dogs_allowed"] = True
                else:
                    if a_clean not in filtered_amenities:
                        filtered_amenities.append(a_clean)
            item["amenities"] = filtered_amenities
            print(f"  [{idx+1}/{len(listings)}] {item['address'][:35]} -> {len(item['photos'])} photos")
        except Exception as e:
            print(f"  [{idx+1}/{len(listings)}] Error fetching detail: {e}")

    output_path = os.path.join(os.path.dirname(__file__), "..", "mpm_site", "data", "available_listings.json")
    output_path = os.path.abspath(output_path)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    if len(listings) == 0:
        print("Warning: 0 listings were scraped from AppFolio. Keeping existing file to prevent clearing valid data.")
        return

    try:
        from zoneinfo import ZoneInfo
        now = datetime.now(ZoneInfo("America/Los_Angeles"))
    except Exception:
        now = datetime.now()

    payload = {
        "scraped_at": now.isoformat(),
        "last_updated": now.strftime("%b %-d, %Y, %-I:%M %p") + " PST",
        "total": len(listings),
        "listings": listings
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, indent=2, ensure_ascii=False)

    print(f"Successfully saved {len(listings)} listings to {output_path}")

if __name__ == "__main__":
    scrape()
