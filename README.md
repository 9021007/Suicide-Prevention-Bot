# Suicide Prevention Bot

Welcome! This bot comes in 3 parts, which can all be run on the same machine, or even different machines!

## Part 1 - The Detection System

Head over to the [binary classification repo](https://github.com/9021007/BinaryClassifier) and clone it.

Inside is one relevant file. That file compiles a machine learning model from the data you provide it, and then launches a server to allow the bot to interface with the machine learning model.

It contains no authentication, do not port forward... obviously.

At the top of the file are various helpful comments explaining the required directory structure for training. At the project root level is the folder "suicidedata", which holds the folders "test" and "train", each of which hold the folders "suicide" and "not", each of which holds text files of your training data, with each file being an indiviual datapoint.

In the end, it would be something like this:
```
BinaryClassifier/
├─ main.py
├─ suicidedata/
│  ├─ train/
│  │  ├─ suicide/
│  │  │  ├─ 0001.txt
│  │  ├─ not/
│  │  │  ├─ 0002.txt
│  ├─ test/
│  │  ├─ suicide/
│  │  │  ├─ 0003.txt
│  │  ├─ not/
│  │  │  ├─ 0004.txt
```
For some sources of data, check out the links in the comments of `main.py`.

Once the folders are organized and filled, run `python3 -m pip install tensorflow==2.15.0` to install TensorFlow.

Finally, you're go for launch. run `python3 main.py` and go for a walk outside. A long walk. Longer. This will take hours... assuming you don't run into any errors.

Once it's running, you can take a deep breath and move on to Part 2. You can run it through `pm2` if you want it daemonized.

## Part 2 - The Database

Clone this repository, and grab the `schema.sql` file.

Install `mysql`, and then run `schema.sql` through `mysql` to set up the database.

Make sure that the database is accessible via a password, and make sure you save that password somewhere.

## Part 3 - The Bot

If you have not done so already, simply clone the repository, and open it in your IDE of choice.

Once you have done that, clone the `.env.example` file, and rename the cloned version to `.env`. It comes with prefilled example values that you will need to change yourself. Do the same with `config.json.example`, renaming it to `config.json`.

Install `node` and `npm` if you have not done so already.

Once everything is set just right, run `npm i` and `node run index.cjs` to launch.

In theory, the program will connect successfully to both the database and the machine learning model, and it will be ready to go.