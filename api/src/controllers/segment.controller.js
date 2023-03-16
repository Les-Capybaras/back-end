const Trip = require("../models/Trip");
const Location = require("../models/Location");
const Segment = require("../models/Segment");

// Retrieve a single segment from the database
exports.findOne = async (req, res) => {
  const segmentId = req.params.id;
  try {
    const segment = await Segment.findByPk(segmentId, {
      include: [
        { model: Location, as: "start" },
        { model: Location, as: "end" },
      ],
    });
    const trip = await Trip.findByPk(segment.tripId);
    const allSegmentsOfTrip = await Segment.findAll({
      where: { tripId: segment.tripId },
    });
    const firstSegment = allSegmentsOfTrip[0];
    const lastSegment = allSegmentsOfTrip[allSegmentsOfTrip.length - 1];

    const firstLocation = await Location.findByPk(firstSegment.startLocation);
    const endLocation = await Location.findByPk(lastSegment.endLocation);

    const totalDistance = getDistanceFromLatLonInKm(
      firstLocation.longitude,
      firstLocation.latitude,
      endLocation.longitude,
      endLocation.latitude
    );
    const segmentDistance = getDistanceFromLatLonInKm(
      segment.start.longitude,
      segment.start.latitude,
      segment.end.longitude,
      segment.end.latitude
    );
    segment.price = Math.round((segmentDistance * trip.price / totalDistance) * 100) / 100;

    res.send(segment);
  } catch (error) {
    console.error("Can't fetch the segment: " + error);
    res.status(500).send({ message: "An error occurred" });
  }
};

// Compute distance between two points on Earth given their latitudes and longitudes
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
}

// Convert degrees to radians
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}