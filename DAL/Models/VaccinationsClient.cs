using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto
{
    public class VaccinationsClient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        [Required]
        public int ClientId { get; set; }
        [Required]
        public int CreatorId  { get; set; }
        [Required]
        public DateTime VaccinationDate { get; set; }
        public Client? Client { get; set; }
        public VaccinationsCreator? Creator { get; set; }
    }
}
