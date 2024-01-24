using RealEstateTestApi.Models;

namespace RealEstateTestApi.IRepository
{
    public interface ILocationRepository
    {
        public List<Location> getAllLocation();
        public void updateLocationById(Location location);
        public Location findLocationById(int id);

    }
}
