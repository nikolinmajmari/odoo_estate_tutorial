from odoo import fields, models


class Users(models.Model):
    _inherit = "res.users"

    property_ids = fields.One2many(
        comodel_name='estate_property', inverse_name='sales_person_id',
        domain=[('state','=','new')]
    )
