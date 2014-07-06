package org.mk.millia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping( value = "/login" )
public class Login {

  @RequestMapping( method = RequestMethod.GET )
  public String htmlLogin( ) {
    return "login";
  }
}
