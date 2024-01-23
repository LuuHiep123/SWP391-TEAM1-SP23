using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RealEstateTestApi.Controllers
{
    [Route("api/location/")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private ILocationRepository locationRepository;
        public LocationController(ILocationRepository locationRepository)
        {
            this.locationRepository = locationRepository;            
        }

        // GET api/<list location>       
        [HttpGet]
        [Route("getAllLocation")]
        public IActionResult getAllLocation()
        {
            try
            {
               List<Location> listLocation = locationRepository.getAllLocation();
                return Ok(listLocation);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }      
        
    }
}
