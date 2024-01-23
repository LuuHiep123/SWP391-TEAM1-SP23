using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RealEstateTestApi.DTO;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.IService;

namespace RealEstateTestApi.Controllers
{
    [Route("api/account/")]
    [ApiController]
    public class AccountController : Controller
    {
        private IAccountService accountService;
       

        public AccountController(IAccountService accountService) { 
            this.accountService = accountService;
        }

        [HttpPost]
        [Route("login")]
        public IActionResult loginIntoServer(LoginDto loginDto)
        {
            try
            {
                UserTokenDto accessAndRefreshToken = accountService.loginIntoServer(loginDto);
                if (accessAndRefreshToken == null)
                {
                    return BadRequest("Tên đăng nhập hoặc mật khẩu sai, vui lòng nhập lại. ");
                }
                return Ok(accessAndRefreshToken);

            }
            catch (Exception)
            {

                return NotFound("Đã xảy ra lỗi trong quá trình đăng nhập, vui lòng thử lại. ");

            }

        }

    }
}
