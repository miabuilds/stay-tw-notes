#!/usr/bin/env python3
# 使い捨て診断：どの SSML なら Azure が <phoneme> を受けるか一発で確かめる。
#   AZURE_SPEECH_KEY=xxx AZURE_SPEECH_REGION=japaneast python3 scripts/tts-probe.py
import os, urllib.request, urllib.error

KEY = os.environ.get("AZURE_SPEECH_KEY")
REGION = os.environ.get("AZURE_SPEECH_REGION", "japaneast")
if not KEY:
    raise SystemExit("AZURE_SPEECH_KEY を渡してください")
URL = f"https://{REGION}.tts.speech.microsoft.com/cognitiveservices/v1"
NS = "xmlns='http://www.w3.org/2001/10/synthesis'"

# name -> full <speak> ssml。玻(bo) を一声で言わせたい。
CASES = {
    "1 plain zh-CN Xiaoxiao": f"<speak version='1.0' {NS} xml:lang='zh-CN'><voice name='zh-CN-XiaoxiaoNeural'>玻</voice></speak>",
    "2 plain zh-TW HsiaoChen": f"<speak version='1.0' {NS} xml:lang='zh-TW'><voice name='zh-TW-HsiaoChenNeural'>玻</voice></speak>",
    "3 sapi bo1 zh-CN":        f"<speak version='1.0' {NS} xml:lang='zh-CN'><voice name='zh-CN-XiaoxiaoNeural'><phoneme alphabet='sapi' ph='bo1'>玻</phoneme></voice></speak>",
    "4 sapi 'bo 1' zh-CN":     f"<speak version='1.0' {NS} xml:lang='zh-CN'><voice name='zh-CN-XiaoxiaoNeural'><phoneme alphabet='sapi' ph='bo 1'>玻</phoneme></voice></speak>",
    "5 sapi bo (no tone)":     f"<speak version='1.0' {NS} xml:lang='zh-CN'><voice name='zh-CN-XiaoxiaoNeural'><phoneme alphabet='sapi' ph='bo'>玻</phoneme></voice></speak>",
    "6 ipa pwo tone1":         f"<speak version='1.0' {NS} xml:lang='zh-CN'><voice name='zh-CN-XiaoxiaoNeural'><phoneme alphabet='ipa' ph='pwo˥'>玻</phoneme></voice></speak>",
    "7 sapi bo1 no-xmlns":     f"<speak version='1.0' xml:lang='zh-CN'><voice name='zh-CN-XiaoxiaoNeural'><phoneme alphabet='sapi' ph='bo1'>玻</phoneme></voice></speak>",
    "8 sapi bo1 zh-TW voice":  f"<speak version='1.0' {NS} xml:lang='zh-TW'><voice name='zh-TW-HsiaoChenNeural'><phoneme alphabet='sapi' ph='bo1'>玻</phoneme></voice></speak>",
}

for name, ssml in CASES.items():
    req = urllib.request.Request(URL, data=ssml.encode("utf-8"), headers={
        "Ocp-Apim-Subscription-Key": KEY,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
        "User-Agent": "staytw-probe",
    })
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            n = len(r.read())
        print(f"[OK  ] {name}: {n} bytes audio")
    except urllib.error.HTTPError as e:
        try: body = e.read().decode("utf-8", "replace")
        except Exception: body = ""
        print(f"[{e.code}] {name}: reason={e.reason} body={body[:200]!r}")
    except Exception as ex:
        print(f"[ERR ] {name}: {ex}")
