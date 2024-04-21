import datetime

from odoo import api, models, fields
from odoo.exceptions import UserError
from odoo.exceptions import ValidationError
from odoo.tools import float_utils


class EstateProperty(models.Model):
    _name = "estate_property"
    _description = "This table will hold properties info"
    _order = "id desc"

    _sql_constraints = [
        ('check_property_expected_price', 'CHECK(expected_price >= 0)',
         'Expected price of a property should be more than 0'),
        ('check_property_selling_price', 'CHECK(selling_price >=0)', 'Expected selling price >= 0'),
        ('unique_property_name_unique', 'UNIQUE (name)', 'A property with this name already exists')
    ]

    active = fields.Boolean(default=True)
    state = fields.Selection(
        required=True,
        copy=False,
        default="new",
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
    total_area = fields.Integer(compute='_compute_total_area')

    best_offer = fields.Float(compute="_compute_best_offer")

    property_type_id = fields.Many2one("estate_property_type", string="Property Type", required=False)
    buyer_id = fields.Many2one("res.partner", copy=False, string="Property Buyer")
    sales_person_id = fields.Many2one("res.users", string="Sales Person", default=lambda self: self.env.user)

    tag_ids = fields.Many2many("estate_property_tag", string="Tags")
    offer_ids = fields.One2many("estate_property_offer", "property_id")

    @api.depends('garden_area', 'living_area')
    def _compute_total_area(self):
        for ep in self:
            ep.total_area = ep.living_area + ep.garden_area

    @api.depends("offer_ids.price")
    def _compute_best_offer(self):
        for ep in self:
            if len(ep.offer_ids.mapped("price")) != 0:
                ep.best_offer = max(ep.offer_ids.mapped("price"))
            else:
                ep.best_offer = 0

    @api.onchange("garden")
    def _on_change_garden(self):
        if self.garden:
            self.garden_orientation = "north"
            self.garden_area = 10

    def sell_property(self):
        for record in self:
            if record.buyer_id is None:
                raise UserError('Can not sell a property without a buyer.')
            if record.state != 'canceled':
                record.state = 'sold'
                return True
            raise UserError("Can sell a canceled property")

    def cancel_property(self):
        for record in self:
            if self.state != 'sold':
                self.state = 'canceled'
                return True
            raise UserError("Can cancel a sold property")

    @api.constrains('selling_price')
    def _selling_price_check(self):
        for record in self:
            if record.selling_price == 0:
                return True
            if float_utils.float_compare(record.selling_price, record.expected_price * 0.9, 2) < 0:
                raise ValidationError(
                    f'Selling price must be grater than {"{:,.2f}".format(record.expected_price * 0.9)}')

    @api.constrains('expected_price')
    def _expected_price_check(self):
        for record in self:
            if record.selling_price == 0:
                return True
            if float_utils.float_compare(record.selling_price / 0.9, record.expected_price, 2) < 0:
                raise ValidationError(
                    f'Expected price cant be grater that {"{:,.2f}".format(record.selling_price / 0.9)}')

    @api.ondelete(at_uninstall=False)
    def _on_delete(self):
        for _item in self:
            if _item.state not in ['new', 'canceled']:
                raise UserError(f'Can\'t delete a property at state {_item.state}!')
