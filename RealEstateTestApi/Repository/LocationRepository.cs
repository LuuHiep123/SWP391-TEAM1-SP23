using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Repository
{
    public class LocationRepository : ILocationRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public LocationRepository(SWPRealEstateContext swpRealEstateContext) {
            this.swpRealEstateContext = swpRealEstateContext;
        }
        public List<Location> getAllLocation()
        {
            List<Location> listLocation = swpRealEstateContext.Locations.ToList();
            return listLocation;
        }
    }
}
