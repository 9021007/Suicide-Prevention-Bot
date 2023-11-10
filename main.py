import json
import requests


# check for existing English file
try:
    open("en.json", "r")
except FileNotFoundError:
    # download english file from GitHub
    print("\033[1;33mDownloading English file...\033[0m")
    r = requests.get("https://raw.githubusercontent.com/9021007/Suicide-Prevention-Bot/main/locales/en.json")
    
    with open("en.json", "wb") as f:
        f.write(r.content)
    
    print("\033[1;32mDownload complete!\033[0m")

english = open("en.json", "r")
englishobj = json.load(english)

newobj = {}
print("")

# input the name of the new translation file
long = input("Enter the full name of the language, e.g. German: ")
short = input("Enter the short name of the language, e.g. de: ")
short = short.lower()

print("")
print("\033[1;30mYou will now be prompted to translate each word in the English file. Press enter to submit.\nUse \\n to make a line break.\033[0m")
print("")

for key in englishobj:
    print("English: " + englishobj[key])
    translation = input(long + ": ")
    newobj[key] = translation
    print("You have completed " + str(len(newobj)) + " of " + str(len(englishobj)) + " translations")
    print("")

file = open(short + ".json", "w")
json.dump(newobj, file, indent=4)
print("\033[1;32mThank you! The completed translation file has been saved as " + short + ".json\033[0m")
print("\033[1;32mGo submit the translation file onto our Discord and notify a staff member to recive your volunteer role!\033[0m")
