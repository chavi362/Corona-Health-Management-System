using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Dto
{
    public class VaccinationsCreator
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? CreatorID { get; set; }
        [Required]
        public string CreatorName { get; set; }
        public IEnumerable<VaccinationsClient>? VaccinationsClients { get; set; }

    }
}
