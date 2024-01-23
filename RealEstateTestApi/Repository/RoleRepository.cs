using RealEstateTestApi.Data;
using RealEstateTestApi.IRepository;
using RealEstateTestApi.Models;
using System.Reflection.Metadata.Ecma335;

namespace RealEstateTestApi.Repository
{
    public class RoleRepository:IRoleRepository
    {
        private SWPRealEstateContext swpRealEstateContext;
        public RoleRepository(SWPRealEstateContext swpRealEstateContext) {
            this.swpRealEstateContext = swpRealEstateContext;
        }

        public List<Role> getAllRole()
        {
            List<Role> roleList = swpRealEstateContext.Roles.ToList();
            return roleList;
        }
    }
}
