from odoo import models, fields
from odoo.exceptions import AccessError, UserError
from odoo import Command


class EstateProperty(models.Model):
    _inherit = "estate_property"

    def _create_invoices(self):
        """
               Check access rights
               :return: list of created invoices
               """
        if not self.env['account.move'].check_access_rights('create', False):
            try:
                self.check_access_rights('write')
                self.check_access_rule('write')
            except AccessError:
                return self.env['account.move']
        invoice_vals_list = []
        for _property in self:
            invoice_vals_list.append({
                'partner_id': _property.buyer_id.id,
                'journal_id': 1,
                'line_ids': [
                    Command.create({
                        'name': 'Administrative Fee',
                        'quantity': 1,
                        'price_unit': 100
                    }),
                    Command.create({
                        'name': '6% of selling price',
                        'quantity': 1,
                        'price_unit': _property.selling_price * 0.06
                    })
                ]
            })
        moves = self.env['account.move'].with_context(default_move_type='out_invoice').create(invoice_vals_list)
        return moves

    def sell_property(self):
        sold =  super().sell_property()
        self._create_invoices()
        return sold
