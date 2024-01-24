using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class LocationRepository : ILocationRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public LocationRepository(SWPRealEstateContext swpRealEstateContext)
        {
            this.swpRealEstateContext = swpRealEstateContext;
        }
        public List<Location> getAllLocation()
        {
            List<Location> listLocation = swpRealEstateContext.Locations.ToList();
            return listLocation;
        }
        public Location findLocationById(int id)
        {
            Location location = swpRealEstateContext.Locations.Find(id);
            return location;
        }
        public void updateLocationById(Location location)
        {
            swpRealEstateContext.Locations.Update(location);
            swpRealEstateContext.SaveChanges();
        }
    }
}
