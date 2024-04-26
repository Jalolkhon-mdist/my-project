import { Select } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import utils from "utils";
import { useSearchParams } from "react-router-dom";

const Aside: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <Container>
      <Content className="box-style">
        <div className="categories-select">
          <Select
            showSearch
            placeholder={"Categories"}
            style={{ width: "100%" }}
            value={category}
            getPopupContainer={(trigger) => trigger.parentElement}
            onChange={(e) => {
              if (!e) {
                setSearchParams(``);
              } else {
                setSearchParams(`category=${e}`);
              }
            }}
          >
            <Select.Option>
              <div className="option">All</div>
            </Select.Option>
            {utils.categoriesList.flat().map((item: any, index: number) => {
              return (
                <Select.Option
                  key={index}
                  value={`${item.group}, ${item.category}`}
                >
                  <div className="option">
                    <div className="color" data-color={item?.color}></div>{" "}
                    {item.group}{" "}
                    <div className="color" data-color={item?.color}></div>{" "}
                    {item.category}
                  </div>
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <Link to={`/g`} className="custom-btn secondary">
          Join Groups
        </Link>
      </Content>
    </Container>
  );
};

export default Aside;

const Container = styled.aside`
  width: 100%;
`;

const Content = styled.div`
  border-right: 0.5px solid var(--border-color);
  width: 100%;
  height: 100%;
  padding: 25px;

  hr {
    width: 100%;
    height: 0.5px;
    border: none;
    background: var(--border-color);
    margin: 22px 0;
  }

  .categories-select {
    margin-bottom: 20px;

    .ant-select-selector {
      border-radius: 100px;
      border-color: var(--border-color);

      .ant-select-selection-placeholder {
        color: var(--text-color);
      }
    }

    .option {
      display: flex;
      align-items: center;
      column-gap: 7px;

      .color {
        height: 10px;
        aspect-ratio: 1/1;
        border-radius: 50%;
      }

      .color[data-color="red"] {
        background: var(--red-color);
      }

      .color[data-color="blue"] {
        background: var(--blue-color);
      }

      .color[data-color="green"] {
        background: var(--green-color);
      }

      .color[data-color="purple"] {
        background: var(--purple-color);
      }

      .color[data-color="orange"] {
        background: var(--orange-color);
      }
    }
  }
  .custom-btn {
    width: 100%;
    font-size: 16px;
  }
`;
