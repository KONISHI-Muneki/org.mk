package org.mk.millia.entity.account;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity
@Table
public class Role {

  @Id
  @GeneratedValue( strategy = GenerationType.SEQUENCE )
  private Long id;

  @ManyToMany( fetch = FetchType.LAZY , mappedBy = "roles")
  private List< Account > accounts;

  @Version
  private Long version;

  public Long getId( ) {
    return id;
  }

  public void setId( Long id ) {
    this.id = id;
  }

  public Long getVersion( ) {
    return version;
  }

  public void setVersion( Long version ) {
    this.version = version;
  }
}
