export class RoleMiddleware {
  static validateRole(requiredRole: string) {
    return (req: any, res: any, next: any) => {
      const user = req.user;
      if (!user || !user.role) {
        return res.status(403).send({ message: "Acesso negado" });
      }

      if (user.role !== requiredRole) {
        return res.status(403).send({ message: "Permissão insuficiente" });
      }

      next();
    };
  }
}
