from odoo import models, fields


class EstatePropertyTag(models.Model):
    _name = "estate_property_tag"
    _description = "Tag definition for properties"
    _order = "name asc"
    _sql_constraints = [
        ('unique_tag_name', 'UNIQUE (name)', 'This tag name already exists')
    ]

    name = fields.Char(required=True)
    color = fields.Integer()
