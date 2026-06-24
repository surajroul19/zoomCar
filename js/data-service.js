const DATA_PATHS = {
  vehicles: "./data/vehicle.json",
  damages: "./data/damages.json",
  faq: "./data/faq.json",
  recommendations: "./data/recommendations.json"
};

const cache = new Map();

async function readJson(key) {
  if (!cache.has(key)) {
    cache.set(key, fetch(DATA_PATHS[key]).then((response) => {
      if (!response.ok) throw new Error(`Unable to load ${DATA_PATHS[key]}`);
      return response.json();
    }));
  }
  return cache.get(key);
}

export async function loadPortalData(vehicleId) {
  const [vehicleData, damages, faq, recommendations] = await Promise.all([
    readJson("vehicles"),
    readJson("damages"),
    readJson("faq"),
    readJson("recommendations")
  ]);

  const resolvedVehicleId = vehicleData.vehicles[vehicleId] ? vehicleId : vehicleData.fallbackVehicleId;

  return {
    vehicle: vehicleData.vehicles[resolvedVehicleId],
    damages: damages[resolvedVehicleId] || [],
    faq: faq.items || [],
    recommendations: recommendations[resolvedVehicleId] || {}
  };
}
