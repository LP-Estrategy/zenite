#!/usr/bin/env python3
"""
Atualiza automaticamente os últimos 5 vídeos longos do canal @leonardo.spinto
usando a playlist nativa UULF do YouTube (que exclui Shorts e Lives).
Atualiza tanto bio/youtube-latest.json quanto o fallback estático em bio/index.html.
"""
import json, os, re, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime

UULF_PLAYLIST_ID = "UULFa6hP1-qcS9PYucXmdNNGLQ"
FEED_URL = f"https://www.youtube.com/feeds/videos.xml?playlist_id={UULF_PLAYLIST_ID}"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(ROOT, "bio", "youtube-latest.json")
HTML_PATH = os.path.join(ROOT, "bio", "index.html")

def fetch_videos():
    req = urllib.request.Request(FEED_URL, headers={"User-Agent": "Mozilla/5.0"})
    xml_bytes = urllib.request.urlopen(req, timeout=20).read()
    root = ET.fromstring(xml_bytes)
    ns = {
        "atom": "http://www.w3.org/2005/Atom",
        "yt": "http://www.youtube.com/xml/schemas/2015",
    }
    videos = []
    for entry in root.findall("atom:entry", ns)[:5]:
        vid = entry.find("yt:videoId", ns).text.strip()
        title = entry.find("atom:title", ns).text.strip().replace("—", "·").replace("–", "·")
        published = entry.find("atom:published", ns).text.strip()
        videos.append({
            "id": vid,
            "title": title,
            "url": f"https://www.youtube.com/watch?v={vid}",
            "shortUrl": f"https://youtu.be/{vid}",
            "thumb": f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg",
            "publishedAt": published
        })
    return videos

def render_cards_html(videos):
    lines = []
    for idx, v in enumerate(videos, 1):
        safe_title = (
            v["title"]
            .replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace('"', "&quot;")
        )
        lines.append(
            f'      <a class="vcard" href="{v["url"]}" target="_blank" rel="noopener" onclick="trk(\'yt_{v["id"]}\')">'
            f'<div class="thumb"><img loading="lazy" src="{v["thumb"]}" alt="{safe_title}">'
            f'<span class="vnum">#{idx:02d}</span>'
            f'<div class="play"><span><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span></div></div>'
            f'<div class="vtitle">{safe_title}</div></a>'
        )
    return "\n".join(lines)

def main():
    videos = fetch_videos()
    if len(videos) < 1:
        raise RuntimeError("Nenhum vídeo retornado do feed UULF")
    payload = {
        "channel": "@leonardo.spinto",
        "channelId": "UCa6hP1-qcS9PYucXmdNNGLQ",
        "longFormPlaylistId": UULF_PLAYLIST_ID,
        "updatedAt": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
        "videos": videos
    }
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    if os.path.exists(HTML_PATH):
        with open(HTML_PATH, "r", encoding="utf-8") as f:
            html = f.read()
        cards_block = render_cards_html(videos)
        new_html = re.sub(
            r"(<!-- YT_LONG_VIDEOS_START -->)(.*?)(<!-- YT_LONG_VIDEOS_END -->)",
            lambda m: m.group(1) + "\n" + cards_block + "\n      " + m.group(3),
            html,
            flags=re.DOTALL
        )
        if new_html != html:
            with open(HTML_PATH, "w", encoding="utf-8") as f:
                f.write(new_html)
            print("bio/index.html atualizado com sucesso.")
    print("Atualização concluída com", len(videos), "vídeos longos.")

if __name__ == "__main__":
    main()
