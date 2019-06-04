var Catalogo = function() {
    
    this.idcatalogos = 'idcatalogos';
    this.descripcion = 'descripcion';
    this.fechacreacion = 'fechacreacion';
    this.fechamodificacion = 'fechamodificacion';

    this.allColumns = function(prefix) {

        if (prefix === undefined)
            return `${this.idcatalogos},  ${this.descripcion}, ${this.fechacreacion}, ${this.fechamodificacion}`;
        else
            return `${prefix}.${this.idcatalogos},  ${prefix}.${this.descripcion}, ${prefix}.${this.fechacreacion}, ${prefix}.${this.fechamodificacion}`;
    }
}

module.exports = Catalogo;