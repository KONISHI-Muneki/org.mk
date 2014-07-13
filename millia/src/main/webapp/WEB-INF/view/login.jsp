<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ page trimDirectiveWhitespaces="true"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Millia IAA Platform</title>
<link rel="stylesheet" href="/resources/css/kube.min.css" />
</head>
<body>
	<div class="units-row">
		<div class="unit-centered unit-30">
			<h1>Millia IAA Platform</h1>
			<c:url value="/login-processing-url" var="action" />
			<form class="forms" action="${action}" method="POST">
				<fieldset>
					<legend>Login</legend>
					<label>
						ID
						<input type="text" name="name" class="width-100" />
					</label>
					<label>
						Password
						<input type="password" name="password" class="width-100" />
					</label>
					<p>
						<button class="btn-green">Log in</button>
						<button class="btn">Cancel</button>
					</p>
				</fieldset>
			</form>
		</div>
	</div>
</body>
</html>