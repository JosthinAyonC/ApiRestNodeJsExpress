import { Role } from "../../models/Role.js";

const roleHelper = {
  rolesSonValidos: async (roles) => {
    const rolesExistentes = await Role.findAll({ where: { name: roles } });
    const rolesExistentesNombres = rolesExistentes.map((role) => role.name);

    const rolesInvalidos = roles.filter(
      (rol) => !rolesExistentesNombres.includes(rol)
    );
    if (rolesInvalidos.length > 0) {
      throw new Error(
        `Los siguientes roles no son válidos: ${rolesInvalidos.join(", ")}`
      );
    }
  },
};

export default roleHelper;
