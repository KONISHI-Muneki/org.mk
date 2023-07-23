$Q = "GO
-- GO GO
GO
SET NOCOUNT ON
SELECT 1
GO 5
SELECT 2
PRINT 3
 GO
UPDATE A SET V = 1 WHERE R = 1
PRINT 8
SELECT 'GO GO GO GO'
   GO    
-- GO GO GO
GO
EXEC DO
"

# # 途中のGO行で分割
# ($Q -replace "^[^\S\r\n]*[Gg][Oo]\s*") -split "\r?[\n\r][^\S\r\n]*[Gg][Oo][^\S\r\n]*\r?[\n\r]" | % {
#   # 先頭行と末尾行のGOを除去
#   $_ -replace "\r?[\n\r][^\S\r\n]*[Gg][Oo][^\S\r\n]*$"
# } | % {
#   Write-Host '-----'
#   Write-Host $_
# }

<#
  System.Data.SQLClient.SQLCommandでエラーになるGO句対応
  GOごとにクエリを分割する
  "GO <数字>"の場合は指定数自分だけクエリを繰り返す
  @param -Q {string} - クエリ文字列
  @returns {array|string} - GOごとに分割されたクエリ
#>
Function Get-GoExpansionQueries {
  Param([parameter(mandatory)][string]$Q)
  $Qs = @()
  $WorkLines = @()
  $Q -split '\r?\n' | % -Process {
    If($_ -match '^[^\S\r\n]*[Gg][Oo][^\S\r\n]*\d*[^\S\r\n]*$') {
      $eachQ = ($WorkLines -join "`r`n")
      # 実行クエリが空じゃなければ追加処理
      If($eachQ.trim()) {
        # 実行回数抽出
        $n = [int]([regex]::Matches($_, '\d+').Value)
        # 実行回数指定がない場合は実行回数1
        If(-not $n){$n = 1}
        # 実行回数指定に疑似的に対応するためにクエリを実行回数分追加
        For($i = 0; $i -lt $n; $i++) {
          $Qs += $eachQ
        }
      }
      # ワーククリア
      $WorkLines = @()
    } Else {
      # ワークに行を追加
      $WorkLines += $_
    }
  } -End {
    If($WorkLines.Count) {
      $Qs += ($WorkLines -join "`r`n")
    }
  }
  Return $Qs
}

Get-SplittedQueries $Q | % {
  Write-Host '-----'
  Write-Host $_
}