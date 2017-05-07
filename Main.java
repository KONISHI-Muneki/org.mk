package reader;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

public class Main {

	public static E read(String filter) {

		if (filter.indexOf('(') < 0 || filter.indexOf(')') < 0) {
			return new E(filter);
		}

		// filter文字列を走査するためにchar配列に変換.
		char[] chars = filter.toCharArray();

		// 親要素を走査中に一時保存しおくキュー.
		Deque<E> parentRecordQue = new ArrayDeque<>();
		// '&' or '|'のカッコ終点を判別するためのフラグのキュー.
		Deque<Boolean> brancketFlgQue = new ArrayDeque<>();

		// ダミーの起点要素.
		E head = new E("head");
		// 親要素カーソルの初期値はheadにする.
		E parent = head;

		StringBuilder sb = new StringBuilder();
		for (char c : chars) {

			// 空文字の場合は無視.
			if (Character.isSpaceChar(c)) {
				continue;
			}

			if (c == '(') {
				// ただの'('として扱う → フラグはfalse.
				brancketFlgQue.push(false);

			} else if (c == ')') {
				
				// 子要素(ツリーの葉要素)として登録する.
				if (sb.length() > 0) {
					String dstr = sb.toString();
					E e = new E(dstr);
					parent.children.add(e);
					sb = new StringBuilder();
				}

				// '&' or '|'のカッコの終点の場合は親を戻す.
				if (!brancketFlgQue.isEmpty() && brancketFlgQue.pop()) {
					parent = parentRecordQue.pop();
				}

			} else if (c == '&' || c == '|') {
				// 親に子として登録.
				E e = new E("" + c);
				parent.children.add(e);

				// 親を記録してこの'&' or '|'を親にする.
				parentRecordQue.push(parent);
				parent = e;

				// 直近のブランケットの'&' or '|'のカッコ始点フラグを立てる.
				brancketFlgQue.pop();
				brancketFlgQue.push(true);

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

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public List<E> getChildren() {
			return children;
		}

		public void setChildren(List<E> children) {
			this.children = children;
		}
	}

	public static void main(String[] args) throws JsonProcessingException {
		System.out.println(new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT)
				.writeValueAsString(read("(&(a=v)(b=v)(&(c=v)(&(d=v)(f=v)(g=v)))(e=v))")));
		read("test");
	}
}