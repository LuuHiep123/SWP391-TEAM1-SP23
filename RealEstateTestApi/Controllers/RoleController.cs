using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;

namespace RealEstateTestApi.Controllers
{
    [Route("api/role/")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private IRoleRepository roleRepository;
        public RoleController(IRoleRepository roleRepository)
        {
            this.roleRepository = roleRepository;
        }

        [HttpGet]
        [Route("getAllRole")]
        public IActionResult getAllRole()
        {
            try
            {
                List<Role> listRole = roleRepository.getAllRole();
                return Ok(listRole);
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
