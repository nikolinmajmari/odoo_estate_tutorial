from odoo import models,fields


class Preference(models.AbstractModel):
    _name = "awesome_dashbord.preference"
    _description = "User dashboard preferences"


    config = fields.Json()
    userId = fields.Many2one("res.users",default=lambda self: self.env.user)