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
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>mk.org Web Service Platform</title>
<link rel="stylesheet" href="/resources/css/kube.min.css" />
</head>
<body>
	<ul class="blocks-3">
		<li></li>
		<li>
			<h1 class="center">mk.org Web Service Platform</h1>
			<div class="forms">
				<fieldset>
					<legend>Login</legend>
					<label>
						ID <input type="text" name="id" class="width-100" />
					</label>
					<label>
						Password <input type="password" name="user-password" class="width-100" />
					</label>
					<p>
						<button class="btn-green">Log in</button>
						<button class="btn">Cancel</button>
					</p>
				</fieldset>
			</div>
		</li>
		<li></li>
	</ul>
</body>
</html>