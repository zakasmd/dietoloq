import json
import os

files = [
    r'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\en.json',
    r'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\de.json'
]

short_bios = {
    'en': "Leyla Zulfuqarli – Professional dietitian with 15+ years of experience, author of the first diet books in Azerbaijan. With appearances on TV channels like Moskva TV, Show TV, AzTV, Xazar TV, ITV and ARB, international detox programs (Switzerland, Germany), and over 12000 satisfied clients, she makes a real difference in healthy eating.",
    'de': "Leyla Zülfüqarlı – Professionelle Ernährungsberaterin mit 15+ Jahren Erfahrung, Autorin der ersten Diätbücher in Aserbaidschan. Mit Auftritten in TV-Sendern wie Moskva TV, Show TV, AzTV, Xazar TV, ITV und ARB, internationalen Detox-Programmen (Schweiz, Deutschland) und über 12.000 zufriedenen Kunden macht sie einen echten Unterschied in der gesunden Ernährung."
}

for file_path in files:
    lang = 'en' if 'en.json' in file_path else 'de'
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    data['about']['shortBio'] = short_bios[lang]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully updated en.json and de.json shortBios")
