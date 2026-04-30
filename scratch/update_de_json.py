import json
import os

file_path = r'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\de.json'

with open(file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

data['hero']['subtitle'] = "Dyt, Nutr, Anti-Age, FTA Dr. Leyla Zülfüqarlı — Fachärztin für Diätetik, Ernährungsberaterin, Anti-Age-Spezialistin. Autorin der ersten Bücher über gesunde Ernährung und Diät in Aserbaidschan (ECO Prag, IFSO London, EASD Tiflis)."

if 'about' not in data: data['about'] = {}
data['about']['bio1'] = "Dyt, Nutr, Anti-Age, FTA Dr. Leyla Zülfüqarlı — Fachärztin für Diätetik, Ernährungsberaterin und Anti-Age-Spezialistin mit over 15 years of experience. Author of the first dietetics books in Azerbaijan."
data['about']['bio2'] = "Akademische Chronologie:\n• 2008: Abschluss der medizinischen Hochschulausbildung in Baku.\n• 2010: Ausbildung bei der Association of Dietitians of Ukraine.\n• 2012-2013: Universität Istanbul Medipol, Abteilung für Ernährung und Diätetik.\n• 2014: 6. Internationaler Adipositas-Kongress und Kurs für bariatrische Diätetik."
data['about']['bio3'] = "Internationale Leistungen:\n• 2015 Prag (ECO): 22nd European Congress on Obesity.\n• 2015 London (IFSO): 20th World Congress of IFSO.\n• 2016 Tiflis (EASD): Post-graduate Forschung und wissenschaftliche Studien."
data['about']['bio4'] = "Autorenschaft:\n• 2015: Erstes Diätbuch des Landes \"Sağlam bəslən - Arıqla\".\n• 2017: Zweites Buch \"Köklüyün sirri - Секреты ожирения\".\nDr. Leyla verbessert weiterhin das Leben Tausender Menschen nach dem Prinzip: 'Unser Feind ist nicht das Fett, sondern der Zucker.'"

if 'book' not in data: data['book'] = {}
data['book']['teaTitle1'] = "TeaLaks LZ Tee"
data['book']['teaDesc1'] = "Effektive natürliche Lösung gegen Verstopfung. Erweicht das Verdauungssystem, verbessert die Darmpassage und lindert Bauchspannungen. Stärkt den Körper und beseitigt Müdigkeit."
data['book']['teaTitle2'] = "Detox LZ Tee"
data['book']['teaDesc2'] = "Medizinischer Detox-Tee. Beschleunigt den Stoffwechsel, entgiftet und hilft beim Abnehmen von 3-5 kg Übergewicht. Unterstützt die Rückbildung gutartiger Tumore (Myome, Polypen), behandelt Fettleber und Hepatitis. Wirksam bei Bauchspeicheldrüsenentzündungen."

with open(file_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully updated de.json")
