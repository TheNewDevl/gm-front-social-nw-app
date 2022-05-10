import { Button, CircularProgress } from '@mui/material'
import './PopUp.scss'

function PopUp({
  passiveAction,
  passiveBtnText = 'Ok',
  popUpMsg,
  loading,
  activeAction,
}) {
  return (
    <div onClick={passiveAction} className="popUp__container">
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className="popUp"
      >
        <p className="popUp__text">{popUpMsg}</p>
        <div className="popUp__btns">
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={passiveAction}
          >
            {passiveBtnText}
          </Button>

          {activeAction && (
            <Button
              variant="contained"
              color="error"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading ? true : false}
              onClick={activeAction}
            >
              {loading ? (
                <CircularProgress size={'1.7em'} />
              ) : (
                'Supprimer définitivement'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
export default PopUp
