from odoo import models, fields


class EstatePropertyTag(models.Model):
    _name = "estate_property_tag"
    _description = "Tag definition for properties"

    name = fields.Char(required=True)