using RealEstateTestApi.DTO;

namespace RealEstateTestApi.IService
{
    public interface IAccountService
    {
        public UserTokenDto loginIntoServer(LoginDto loginDto);
    }
}
