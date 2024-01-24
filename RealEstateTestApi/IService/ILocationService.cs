using RealEstateTestApi.DTO;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.IService
{
    public interface ILocationService
    {
        public void updateLocationById(Location location);
        public Location findLocationById(int id);
    }
}
