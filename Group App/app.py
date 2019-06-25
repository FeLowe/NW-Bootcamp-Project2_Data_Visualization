# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:helpme01@localhost/airbnb_data'
db = SQLAlchemy(app)

class Listings(db.Model):
    __tablename__ = 'listings'

    Price = db.Column(db.Float)
    Room_Id = db.Column(db.Integer, primary_key=True)
    Room_Type = db.Column(db.String(64))
    City = db.Column(db.String(64))
    Country = db.Column(db.String(64))
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    Selection = db.Column(db.String(64))
    Distance = db.Column(db.Float)


    def __repr__(self):
        return '<Listing %r>' % (self.Room_Id)

class Selection(db.Model):
    __tablename__ = 'cities'

    Selection = db.Column(db.String(255), primary_key=True)

    def __repr__(self):
        return '<Selection %r>' % (self.Selection)


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


@app.route("/api/listings")
def rooms():
    results = db.session.query(Listings.Price, Listings.Room_Id, Listings.Room_Type, Listings.City, Listings.Country, Listings.Latitude, Listings.Longitude, Listings.Selection, Listings.Distance).all()
    listings_data = []

    for result in results:
        price = result[0] 
        room_id = result[1] 
        room_type = result[2] 
        city = result[3] 
        country = result[4]
        lat = result[5]
        lon = result[6]
        selection = result[7]
        distance = result[8]


        result_data = {
            "price": price,
            "room_id": room_id,
            "room_type": room_type,
            "city": city,
            "country": country,
            "lat": lat,
            "lon": lon,
            "selection": selection,
            "distance": distance
        }


        listings_data.append(result_data)
    
    
    
    # returns a the correct format for mapping
    # price = [result[0] for result in results]
    # lat = [result[1] for result in results]
    # lon = [result[2] for result in results]
    # city = [result[3] for result in results]


    # map_data = [{
    #     "type": "scattergeo",
    #     "locationmode": "USA-states",
    #     "lat": lat,
    #     "lon": lon,
    #     "price": price,
    #     "city": city,
    #     "hoverinfo": "text",
    #     "marker": {
    #         "size": 50,
    #         "line": {
    #             "color": "rgb(8,8,8)",
    #             "width": 1
    #         },
    #     }
    # }]


    return jsonify(listings_data)
    
@app.route("/api/selection")
def cities():
    results = db.session.query(Selection.Selection).all()
    cities_data = [ {"selection" : result[0]} for result in results]
    
    return jsonify(cities_data)


if __name__ == "__main__":
    app.run()
