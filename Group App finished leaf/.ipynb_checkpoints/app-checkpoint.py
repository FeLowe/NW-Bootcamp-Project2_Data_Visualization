# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://<username>:<password>@localhost/airbnb_data'
db = SQLAlchemy(app)

class Listings(db.listings):
    __tablename__ = 'listings'

    Price = db.Column(db.Float)
    Room_Id = db.Column(db.Integer, primary_key=True)
    Room_Type = db.Column(db.String(64))
    City = db.Column(db.String(64))
    Country = db.Column(db.String(64))
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    Selection = db.Column(db.String(64))


    def __repr__(self):
        return '<Listing %r>' % (self.Room_Id)


# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and send the jsonified results
# @app.route("/send", methods=["GET", "POST"])
# def send():
#     if request.method == "POST":
#         name = request.form["petName"]
#         lat = request.form["petLat"]
#         lon = request.form["petLon"]

#         pet = Pet(name=name, lat=lat, lon=lon)
#         db.session.add(pet)
#         db.session.commit()
#         return redirect("/", code=302)

#     return render_template("form.html")


@app.route("/api/rooms")
def rooms():
    results = db.session.query(Listings.Price, Listings.Latitude, Listings.Longitude, Listings.City).all()

    price = [result[0] for result in results]
    lat = [result[1] for result in results]
    lon = [result[2] for result in results]
    city = [result[3] for result in results]


    airbnb_data = [{
        "type": "scattergeo",
        "locationmode": "USA-states",
        "lat": lat,
        "lon": lon,
        "price": price,
        "city": city,
        "hoverinfo": "text",
        "marker": {
            "size": 50,
            "line": {
                "color": "rgb(8,8,8)",
                "width": 1
            },
        }
    }]

    return jsonify(airbnb_data)


if __name__ == "__main__":
    app.run()
