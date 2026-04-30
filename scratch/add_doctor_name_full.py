import json
import os

files = [
    r'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\az.json',
    r'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\ru.json',
    r'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\en.json',
    r'c:\Users\zekas\DIETOLOQ\dietoloq\src\i18n\messages\de.json'
]

titles = {
    'az': "Dyt, Nutr, Anti-age, FTA Dr Leyla Zülfüqarlı",
    'ru': "Диет., Нутр., Анти-эйдж, FTA д-р Лейла Зульфугарлы",
    'en': "Dyt, Nutr, Anti-age, FTA Dr. Leyla Zülfüqarlı",
    'de': "Dyt, Nutr, Anti-Age, FTA Dr. Leyla Zülfüqarlı"
}

for file_path in files:
    lang = os.path.basename(file_path).split('.')[0]
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    data['hero']['doctorNameFull'] = titles[lang]
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

print("Successfully added doctorNameFull to all JSONs")
