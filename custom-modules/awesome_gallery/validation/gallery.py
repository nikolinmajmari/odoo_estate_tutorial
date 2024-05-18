import logging
import os

from lxml import etree

from odoo.loglevels import ustr
from odoo.tools import misc,view_validation
from odoo.modules.module import get_resource_path

_logger = logging.getLogger(__name__)

_viewname_validator = None

@view_validation.validate('gallery')
def schema_gallery(arch,**kwargs):
    """
        Check gallery view against it's schema
        : type arch: etree._Element
    """

    global _viewname_validator
    
    if _viewname_validator is None:
        with misc.file_open(get_resource_path("awesome_gallery","rng","gallery.rng")) as file :
            _viewname_validator = etree.RelaxNG(etree.parse(file))
    if _viewname_validator.validate(arch):
        return True 
    
    for error in _viewname_validator.error_log:
        _logger.error(ustr(error))
    return False