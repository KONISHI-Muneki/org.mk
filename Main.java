package reader;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

public class Main {

	public static E read(String filter) {

		if (filter.indexOf('(') < 0 || filter.indexOf(')') < 0) {
			return new E(filter);
		}

		// filter文字列を走査するためにchar配列に変換.
		char[] chars = filter.toCharArray();
		
		// 
		Deque<E> parentElementQue = new ArrayDeque<>();
		Deque<Integer> brncktCntQue = new ArrayDeque<>();
		
		// ダミーの起点要素.
		E head = new E("head");
		
		// 親要素カーソルの初期値はheadにする.
		E parent = head;
		int brancketCnt = 0;
		StringBuilder sb = new StringBuilder();
		for (char c : chars) {
			if (Character.isSpaceChar(c)) {
				continue;
			}

			if (c == '(') {
				brancketCnt++;
			} else if (c == ')') {
				String dstr = sb.toString();
				if (StringUtils.isNotBlank(dstr)) {
					E e = new E(dstr);
					parent.children.add(e);
				}
				sb = new StringBuilder();
				if (!brncktCntQue.isEmpty() && brancketCnt == brncktCntQue.getFirst()) {
					parent = parentElementQue.pop();
					brncktCntQue.pop();
				}
				brancketCnt--;
			} else if (c == '&' || c == '|') {
				E e = new E("" + c);
				parent.children.add(e);
				parentElementQue.push(parent);
				parent = e;
				brncktCntQue.push(brancketCnt);
			} else {
				sb.append(c);
			}
		}

		if (sb.length() != 0) {
			throw new IllegalArgumentException("Invalid filter \"" + filter + "\".");
		}

		if (head.children.size() != 1) {
			throw new IllegalArgumentException("Invalid filter \"" + filter + "\".");
		}

		return head.children.get(0);
	}

	private static class E {

		private String description;

		private List<E> children = new ArrayList<>();

		private E(String description) {
			this.description = description;
		}
	}

	public static void main(String[] args) {
		read("(&(a=v)(b=v)(&(c=v)(&(d=v)(f=v)(g=v)))(e=v))(test)");
		read("test");
	}
}