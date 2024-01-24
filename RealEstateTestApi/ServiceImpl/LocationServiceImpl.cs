using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;
using RealEstateTestApi.Models;
using RealEstateTestApi.Repository;
using System.Data;

namespace RealEstateTestApi.ServiceImpl
{
    public class LocationServiceImpl:ILocationService
    {
        private ILocationRepository locationRepository;

        public Location findLocationById(int id)
        {
            return locationRepository.findLocationById(id);
        }
        public void updateLocationById(Location location)
        {
            locationRepository.updateLocationById(location);
        }
    }
}
