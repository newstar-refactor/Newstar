from typing import Union

from pydantic import BaseModel

class Recode(BaseModel):
    # Union[int, None] : 값 없으면 None
    recodeId : Union[int, None] = None
    memberId : Union[int, None] = None
    articleId : Union[int, None] = None
    like : Union[bool, None] = None