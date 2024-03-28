using DAL.DataAccess;
using DAL.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repository
{
    public interface IClientsRepository
    {
        Task<List<Client>> GetClients();
        Task<Client> AddClient(Client client);
        Task UpdateClient(Client client);
        Task<Client> GetClient(int Id);
        Task<List<VaccinationsCreator>> GetCreators();
        Task DeleteClient(int id);
        Task<List<Client>> GetUnvaccinatedClients();
    }

    public class ClientsRepository : IClientsRepository
    {
        private CovidContext _context { get; set; }

        public ClientsRepository(CovidContext context)
        {
            _context = context;
            SeedDefaultCreators().Wait(); // Call the method during initialization
        }

        public async Task SeedDefaultCreators()
        {
            // Check if creators already exist
            if (_context.VaccinationsCreators.Any())
            {
                return; // If creators exist, no need to seed again
            }

            // Seed default creators
            var defaultCreators = new List<VaccinationsCreator>
            {
                new VaccinationsCreator { CreatorName = "Creator 1" },
                new VaccinationsCreator { CreatorName = "Creator 2" },
                 new VaccinationsCreator { CreatorName = "Creator 3" }
            };

            await _context.VaccinationsCreators.AddRangeAsync(defaultCreators);
            await _context.SaveChangesAsync();
        }

        // Other methods remain unchanged
        public async Task<List<Client>> GetClients()
        {
            var list = await _context.Clients.ToListAsync();
            return list;
        }

        public async Task<Client> GetClient(int id)
        {
            Client client = await _context.Clients.Where(x => x.ClientId == id)
                .Include(x => x.VaccinationsClients).ThenInclude(x => x.Creator)
                .FirstOrDefaultAsync();
            return client;
        }

        public async Task<Client> AddClient(Client client)
        {
            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();
            return client;
        }

        public async Task UpdateClient(Client client)
        {
            Client clientFromDb = await GetClient(client.ClientId ?? 0);
            clientFromDb.FirstName = client.FirstName;
            clientFromDb.LastName = client.LastName;
            clientFromDb.Identity = client.Identity;
            clientFromDb.City = client.City;
            clientFromDb.Street = client.Street;
            clientFromDb.BuildingNumber = client.BuildingNumber;
            clientFromDb.MobileNumber = client.MobileNumber;
            clientFromDb.PhoneNumber = client.PhoneNumber;
            clientFromDb.PositiveResultDate = client.PositiveResultDate;
            clientFromDb.RecoveryDate = client.RecoveryDate;
            clientFromDb.VaccinationsClients = client.VaccinationsClients;
            _context.Clients.Update(clientFromDb);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteClient(int id)
        {
            var client = await _context.Clients.Where(x => x.ClientId == id).FirstAsync();
            if (client != null)
                _context.Clients.Remove((Client)client);
            await _context.SaveChangesAsync();
        }

        public async Task<List<VaccinationsCreator>> GetCreators()
        {
            var list = await _context.VaccinationsCreators.ToListAsync();
            return list;
        }

        public async Task<List<Client>> GetUnvaccinatedClients() // Changed return type to Task<List<Client>>
        {
            var unvaccinatedClients = await _context.Clients
                .Where(c => c.VaccinationsClients == null || !c.VaccinationsClients.Any())
                .ToListAsync();
            return unvaccinatedClients;
        }

    }
}
