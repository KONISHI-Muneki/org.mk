package template.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Version;

@Entity
@Table
public class Sample {

  @Id
  @GeneratedValue( strategy = GenerationType.SEQUENCE )
  private Long id;
  
  @Column
  private String name;

  @Version
  private Long version;

  public Long getId( ) {
    return id;
  }

  public void setId( Long id ) {
    this.id = id;
  }

  public String getName( ) {
    return name;
  }

  public void setName( String name ) {
    this.name = name;
  }

  public Long getVersion( ) {
    return version;
  }

  public void setVersion( Long version ) {
    this.version = version;
  }
}
