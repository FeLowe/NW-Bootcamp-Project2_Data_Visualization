import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)


#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/bellybutton.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
Cities_Summary = Base.classes.city_summary
Cities = Base.classes.cities


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")


# @app.route("/names")
# def names():
#     """Return a list of sample names."""

#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[2:])


@app.route("/summary/<city>")
def city_summary(city):
    """Return the MetaData for a given sample."""
    sel = [
        Cities_Summary.city,
        # Cities_Summary.CITY,
        Cities_Summary.COUNTRY,
        Cities_Summary.MEDIAN_PRICE,
        Cities_Summary.TOTAL_ROOMS,
        # Samples_Metadata.BBTYPE,
        # Samples_Metadata.WFREQ,
    ]

    results = db.session.query(*sel).filter(Cities_Summary.city == city).all()

    # Create a dictionary entry for each row of metadata information
    city_summary = {}
    for result in results:
        city_summary["city"] = result[0]
        # city_summary["CITY"] = result[1]
        city_summary["COUNTRY"] = result[2]
        city_summary["MEDIAN_PRICE"] = result[3]
        city_summary"TOTAL_ROOMS"] = result[4]
        # sample_metadata["BBTYPE"] = result[5]
        # sample_metadata["WFREQ"] = result[6]

    print(city_summary)
    return jsonify(city_summary)


# @app.route("/samples/<sample>")
# def samples(sample):
#     """Return `otu_ids`, `otu_labels`,and `sample_values`."""
#     stmt = db.session.query(Samples).statement
#     df = pd.read_sql_query(stmt, db.session.bind)

#     # Filter the data based on the sample number and
#     # only keep rows with values above 1
#     sample_data = df.loc[df[sample] > 1, ["otu_id", "otu_label", sample]]
#     # Format the data to send as json
#     data = {
#         "otu_ids": sample_data.otu_id.values.tolist(),
#         "sample_values": sample_data[sample].values.tolist(),
#         "otu_labels": sample_data.otu_label.tolist(),
#     }
#     return jsonify(data)


if __name__ == "__main__":
    app.run()