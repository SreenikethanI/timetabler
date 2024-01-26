Const Prefix As String = "P"

Public Sub AddPrefix()
    Dim Sel As Range
    Dim C As Range

    Set Sel = Selection

    For Row = 1 To Sel.Rows.Count
        For Col = 1 To Sel.Columns.Count
            Set C = Sel(Row, Col)
            C.Value = Prefix + C.Text
        Next Col
    Next Row
End Sub
