from odoo import models, fields


class EstatePropertyType(models.Model):
    _name = "estate_property_type"
    _description = "Property type"
    _order = "name asc"
    name = fields.Char(required=True)
    sequence = fields.Integer('Sequence', default=1, help='Used to order property types, lower is better')
    properties_ids = fields.One2many('estate_property', 'property_type_id')
    offer_ids = fields.One2many('estate_property_offer', 'property_type_id')

    offer_count = fields.Integer(compute='_count_offers')

    def _count_offers(self):
        for _type in self:
            _type.offer_count = len(_type.offer_ids)
