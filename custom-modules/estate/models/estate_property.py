import datetime

from odoo import models, fields


class EstateProperty(models.Model):
    _name = "estate_property"
    _description = "This table will hold properties info"

    active = fields.Boolean(default=True)
    state = fields.Selection(
        required=True,
        copy=False,
        default=None,
        selection=[
            ("new", "New"),
            ("offer_received", "Offer Received"),
            ("offer_accepted", "Offer Accepted"),
            ("sold", "Sold"),
            ("canceled", "Canceled")
        ]
    )

    name = fields.Char(required=True)
    description = fields.Text()
    postcode = fields.Char()
    date_availability = fields.Date(copy=False, default=fields.Date.add(fields.Date.today(), months=+1))
    expected_price = fields.Float(required=True)
    selling_price = fields.Float(readonly=True, copy=False)
    bedrooms = fields.Integer(default=2)
    living_area = fields.Integer()
    facades = fields.Integer()
    garage = fields.Boolean()
    garden = fields.Boolean()
    bathrooms = fields.Integer()
    garden_area = fields.Integer()
    garden_orientation = fields.Selection(
        string='Type of the orientation',
        selection=[('north', 'North'), ('east', "East"), ('south', "South"), ('west', 'West')]
    )