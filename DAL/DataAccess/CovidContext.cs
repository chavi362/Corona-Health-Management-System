using DAL.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace DAL.DataAccess
{
    public class CovidContext :DbContext
    {
        public CovidContext(DbContextOptions<CovidContext> options) : base(options) { }
        public DbSet<Client> Clients { get; set; }
        public DbSet<VaccinationsCreator> VaccinationsCreators { get; set; }
        public DbSet<VaccinationsClient> VaccinationsClients { get; set; } 
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<VaccinationsClient>().HasOne(v => v.Client).WithMany(v => v.VaccinationsClients).HasForeignKey(v=>v.ClientId);
            builder.Entity<VaccinationsClient>().HasOne(v => v.Creator).WithMany(v => v.VaccinationsClients).HasForeignKey(v=>v.CreatorId);
            builder.Entity<Client>(entity => entity.HasIndex(e => e.Identity).IsUnique());
        }
    }
}
