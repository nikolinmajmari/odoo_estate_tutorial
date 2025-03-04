FROM odoo:17.0

# Set container name (this is typically handled in Docker Compose, not Dockerfile)
LABEL container_name="odoo_estate"

# Set the working directory
WORKDIR /usr/lib/python3/dist-packages/odoo

# Copy configuration files into the container
COPY ./config /etc/odoo

# Bind custom modules directory (Volumes are typically managed in Docker Compose, not Dockerfile)
COPY ./custom-modules /mnt/extra-addons

# Expose the necessary port
EXPOSE 8069

# Set the command to run Odoo with development mode enabled
CMD ["odoo", "--dev=all"]