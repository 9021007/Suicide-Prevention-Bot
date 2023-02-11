import json
import requests

long = input("Enter the name of the language, e.g. German: ")

short = input("Enter the short name of the language, e.g. de: ")
short = short.lower()

# check for existing englsih file
try:
    open("en.json", "r")
except FileNotFoundError:
    # download english file
    print("Downloading english file...")
    r = requests.get("https://raw.githubusercontent.com/Bobrobot1/Suicide-Prevention-Bot/main/locales/en.json")
    
    with open("en.json", "wb") as f:
        f.write(r.content)
    
    print("Download complete!")

english = open("en.json", "r")
englishobj = json.load(english)

newobj = {}
print("")

print("You will now be prompted to translate each word in the english file. Press enter to submit.")
print("")

for key in englishobj:
    print("English: " + englishobj[key])
    translation = input(long + ": ")
    newobj[key] = translation
    print("You have completed " + str(len(newobj)) + " of " + str(len(englishobj)) + " translations")
    print("")

file = open(short + ".json", "w")
json.dump(newobj, file, indent=4)
print("Thank you! The completed translation file has been saved as " + short + ".json")